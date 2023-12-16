App = {
  webProvider: null,
  contracts: {},
  account: '0x0',
 
 
  init: function() {
    return App.initWeb();
  },
 
 
  initWeb:function() {
    // if an ethereum provider instance is already provided by metamask
    const provider = window.ethereum
    if( provider ){
      // currently window.web3.currentProvider is deprecated for known security issues.
      // Therefore it is recommended to use window.ethereum instance instead
      App.webProvider = provider;
    }
    else{
      $("#loader-msg").html('No metamask ethereum provider found')
      console.log('No Ethereum provider')
      // specify default instance if no web3 instance provided
      App.webProvider = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
 
 
    return App.initContract();
  },
 
 
  initContract: function() {
    $.getJSON("Course_tracker.json", function( courseTracker ){
      // instantiate a new truffle contract from the artifict
      App.contracts.Course_tracker = TruffleContract( courseTracker );
 
 
      // connect provider to interact with contract
      App.contracts.Course_tracker.setProvider( App.webProvider );

      App.listenForEvents();
 
      return App.render();
    })
  },
 
 
  render: async function(){
    var courseTrackerInstance;
    var loader = $("#loader");
    var content = $("#content");
 
 
    loader.show();
    content.hide();
   
    // load account data
    if (window.ethereum) {
      try {
        // recommended approach to requesting user to connect metamask instead of directly getting the accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        App.account = accounts;
        $("#accountAddress").html("Your Account: " + App.account);

        loader.hide();
        content.show();

      } catch (error) {
        if (error.code === 4001) {
          //  code 4001 === User rejected request
          console.warn('user rejected')
        }
        console.error(error);
      }
    }
 
  },

  // add course
  addCourse: function(){
    let studentId1 = $("#studentID1").val();
    let semester1 = $("#semester1").val();
    let course = $("#course").val();
    let gpa = $("#gpa").val();

    App.contracts.Course_tracker.deployed()
    .then( function( instance ){
      return instance.addCourse( studentId1, semester1, course, gpa, { from: App.account[0] } )
    })
    .then( function( result ){
      // wait for student to add course
      console.log({ result })
        // content.hide();
        // loader.show();
        alert("You have added course successfully")
    })
    .catch( function( err ){
      console.error( err )
    } )
  },

  // get CGPA
  getCGPA: function(){
    let studentId2 = $("#studentId2").val();
    let semester2 = $("#semester2").val();

    App.contracts.Course_tracker.deployed()
    .then( function( instance ){
      return instance.getCGPA( studentId2, semester2, { from: App.account[0] } )
    })
    .then( function( result ){
      let cgpaOutput = $("#cgpaOutput");
      cgpaOutput.empty();
      cgpaOutput.html(result);

      // wait for cgpa
      console.log({ result })
        // content.hide();
        // loader.show();
        alert("You have fetched cgpa successfully")
    })
    .catch( function( err ){
      console.error( err )
    } )
  },

  // get courses
  getCourses: function(){
    let studentId3 = $("#studentId3").val();
    let semester3 = $("#semester3").val();

    App.contracts.Course_tracker.deployed()
    .then( function( instance ){
      return instance.getCourses( studentId3, semester3, { from: App.account[0] } )
    })
    .then( function( result ){
      let coursesOutput = $("#coursesOutput");
      coursesOutput.empty();
      coursesOutput.html(result);

      // wait for cgpa
      console.log({ result })
        // content.hide();
        // loader.show();
        alert("You have fetched cgpa successfully")
    })
    .catch( function( err ){
      console.error( err )
    } )
  },

  listenForEvents: function(){
    App.contracts.Course_tracker.deployed()
    .then(function(instance){
      // First event
      instance.CourseAddedEvent({}, {
        fromBlock: 0,
        toBlock: "latest"
      }).watch(function(error, event){
        console.log("CourseAddedEvent triggered", event);
        // App.render();
      });
  
      // Second event
      instance.CGPARetrievedEvent({}, {
        fromBlock: 0,
        toBlock: "latest"
      }).watch(function(error, event){
        console.log("CGPARetrievedEvent triggered", event);
        // App.render();
      });
  
      // Third event
      instance.CoursesRetrievedEvent({}, {
        fromBlock: 0,
        toBlock: "latest"
      }).watch(function(error, event){
        console.log("CoursesRetrievedEvent triggered", event);
        // App.render();
      });
    });
  }
  
 };
 
 
 $(function() {
  $(window).load(function() {
    App.init();
  });
 });

 
 