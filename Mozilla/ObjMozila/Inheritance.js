// To run the example, load index.html in your browser.

// Definition - PROTOTYPE (exact same case used accross the whole file)
// A PROTOTYPE in Javascript, is an object linked to another (by reference for instance) in order to
// share behaviours.
//
// Differently stated, a PROTOTYPE is the name given to an object used by another, in a composition relationship.
// Object composition is the method used in Javascript to implement Obect Oriented Programing inheritence.
// Keeping this in mind, a PROTOTYPE is also said to be a parent object.
//
// Note: In javascript there is no concept of class. Only objects are used. This is also why the method used 
// to implement inheritence is object composition.
//
// Note: Often Javascript is said to not be an OOP language because of that inheritence mecanism. Let's keep in mind
// that things such as inheritence are concepts. That is, reasoning tools. As they are things useful to one's mind, 
// nothing prevents anyone from using them in Javascript. Even if more programming work is needed than in C++ or Java 
// for instance (where, by the way, the inheritence mecanism is implemented in the compilers).

//// DEFINITION OF CLASS A

// Constructor function - 'this' will be replaced by a reference to the object being constructed
function A()
{
    this.a = "a";
}

// Bind Methods to A.prototype object. Look below for further information. 
A.prototype.foo = function(){return "This is 50!";}

/// DEFINITION OF CLASS B (B inherits from A)

function B()
{
    A.call(this); // Calls A's constructor. Replaces A's 'this' symbol by the object being instanciated.

    this.b = "b"; // Adding one property
}

// FINISHING UP THE INHERITENCE PROCESS
// (first step is to call the parent constructor in the child's constructor A.call(this))
///////////////////////////////////////////////////////////

// Creates an object and sets its PROTOTYPE to A.prototype (A(), the constructor is not called).
B.prototype = Object.create(A.prototype);

// When A.prototype is copied to B.prototype. B.prototype.constructor is filled with value A. 
// This is incorrect because B.prototype's constructor is B (B.prototype object is created when calling B(), not A()).
B.prototype.constructor = B; 
//////////////////////////////////////////////////////////

B.prototype.bar = function() {return "G Unit!";}; // Adding properties to B.prototype to share behavours.

// Creates an object, calls A() (the constructor), links to A.prototype (to share behaviours; 
// because A is a parent class, the interpreter must link the object to Object.prototype) 
// and gets all properties from A.prototype.[...]. Thats is, all properties bound to A.prototype,
// such as A.prototype.foo (see above).
var a_obj = new A;      // equivalent to new A();

// Creates an object, calls B() (the constructor), links to B.prototype (which is A.prototype).
// Doing so links all B objects (instances of B) to A. Hence, allowing all Bs to get A.prototype's
// properties - this is one of the tricks to implement inheritence in Javascript (inheritence is implemented
// through object composition).
//
// Going back to the creation process, all properties (generaly methods only) manually bound to B.prototype are 
// also linked to the new object. For a better understanding, let's have a look at B's composition:
//
// B.prototype = A.prototype; // Write A.prototype's fields into B.prototype's structure
// (they are the same exept for the fields manually defined by developpers. About the word structure used above,
// a Javascript object can be roughly assimilated to a C structure). This way, B gains access to all 
// A.prototype's properties.
//
// B.prototype.bar = function()...; // B.prototype has got some properties of its own defined above. The new instance
// gets access to them because it is bound to B.prototype (that is linked to A.prototype) and not A.prototype.
// Note:    - b_obj's PROTOTYPE is B.prototype. 
//          - B.prototype's PROTOTYPE is A.prototype.
//          - A.prototype's PROTOTYPE is Object.prototype.
//          - Object.prototype's PROTOTYPE is null.
// Note: when a parent's property is called the same as a child's, the parent's property is shadowed.
var b_obj = new B();

/// EXAMPLE CODE

// Check objects' type
var str = "Is a_obj an instance of A? " + (a_obj instanceof A) + ", B? " + (a_obj instanceof B) + ". ";
str += "Is b_obj an instance of A? " + (b_obj instanceof A) + ", B? " + (b_obj instanceof B) + ".";

// Print test on webpage
var body = document.querySelector("body");
body.textContent += str;


/* In a nutshell, to implement B inherits from A one must write

function B(){ A.call(this);}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;

*/

var obj = {hey:"bob"};                      // Prototype is Object.prototype
Object.setPrototypeOf(obj, A.prototype);    // Now it is set to A.prototype

var p = document.createElement("p");
body.appendChild(p);
p.textContent += "obj's prototypal chain: obj -> " + Object.getPrototypeOf(obj).constructor.name + " -> " 
                + Object.getPrototypeOf(Object.getPrototypeOf(obj)).constructor.name;
