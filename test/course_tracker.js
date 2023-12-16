let Course_tracker = artifacts.require("./Course_tracker.sol");


 contract("Course_tracker", function(accounts){
   let courseTrackerInstance;


   it("initialize with two courses", function(){
       return Course_tracker.deployed()
       .then( function(instance){
           return instance.coursesCount()
       })
       .then( function( count ){
           assert.equal( count, 2 )
       });
   });


//    it("it initialize the students with the correct values", function(){
//        return Course_tracker.deployed()
//        .then( function(instance){
//            courseTrackerInstance = instance;
//            return courseTrackerInstance.students(1);
//        })
//        .then( function( candidate ){
//            assert.equal( candidate[0], 1, "contains correct id" );
//            assert.equal( candidate[1], "Candidate 1", "contains correct name" );
//            assert.equal( candidate[2], 0, "contains correct votes count" );
//            return courseTrackerInstance.students(2);
//        })
//        .then( function(candidate){
//            assert.equal( candidate[0], 2, "contains correct id" );
//            assert.equal( candidate[1], "Candidate 2", "contains correct name" );
//            assert.equal( candidate[2], 0, "contains correct votes count" );
//            return courseTrackerInstance.students(2);
//        });
//    });
});
