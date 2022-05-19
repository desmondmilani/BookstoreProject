//users class
class User{
    constructor(fullnames, email, phone, imgPhoto, pwd) {
        this.fullnames = fullnames;
        this.email = email;
        this.phone = phone;
        this.imgPhoto = imgPhoto;
        this.pwd = pwd;
    }

    getHtml() {
        let text = "<div class='user'>";
        text = text + "<img src='" + this.imgPhoto + "' />";
        text = text + "<p> Email: " + this.email + "</p></div>";
        return text;
    }
}

//a class for book
class Book{
    constructor(title, author, genre, price, image) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.price = price;
        this.image = image;
    }
}


//function that will create books
function createBooks() {
    let tmpBooks = [];
    tmpBooks.push(new Book("Agnes at the end of the world", "Kelly McWilliams", "romance", "R450.00", "./Images/Movies/agnes.jpg"));
    tmpBooks.push(new Book("Dune", "Frank Herbert", "action", "R400.00", "./Images/Movies/dune.jpg"));
    tmpBooks.push(new Book("Five feet apart", "Rachael", "drama", "R399.00", "./Images/Movies/five.jpg"));
    tmpBooks.push(new Book("The girl in red", "Christina Henry", "action", "R500.00", "./Images/Movies/girl.jpg"));
    tmpBooks.push(new Book("The gravity of us", "Paul Stamper", "drama", "R349.00", "./Images/Movies/gravity.jpg"));
    tmpBooks.push(new Book("The gods hate midnight", "Aubidah Handi", "drama", "R237.00", "./Images/Movies/hands.jpg"));
    tmpBooks.push(new Book("Imaginery friend", "Stephen Chbosky", "comedy", "R300.00", "./Images/Movies/imagine.jpg"));
    tmpBooks.push(new Book("The mind of a leader", "Kevin Anderson", "drama", "R500.00", "./Images/Movies/leader.png"));
    tmpBooks.push(new Book("The swallows", "Lisa Lutz", "comedy", "R400.00", "./Images/Movies/lisa.jpg"));
    tmpBooks.push(new Book("Lunar storm", "Terry Crosby", "comedy", "R345.00", "./Images/Movies/luna.jpg"));
    tmpBooks.push(new Book("Sorrow and bliss", "Meg Mason", "romance", "R500.00", "./Images/Movies/meg.jpg"));
    tmpBooks.push(new Book("The imperfection of memory", "Andlina Naidoo", "drama", "R400.00", "./Images/Movies/memory.jpg"));
    tmpBooks.push(new Book("New world", "Desmond Milani", "action", "R400.00", "./Images/Movies/new.jpg"));
    return tmpBooks;
}



//class for the app it self
class StoreApp {
    constructor() {
        this.user = new User("","","","","");
        this.users = [];
        this.userState = "offline";
    }

    registerUser() {
        //Get information from the inputs
        console.log("registering user....");
        let fullnames = document.forms["register"]["txtFullname"].value;
        let email = document.forms["register"]["txtEmail"].value;
        let phone = document.forms["register"]["txtPhone"].value;
        let imgPhoto = document.forms["register"]["imgPhoto"].value;
        let pwd = document.forms["register"]["txtPwd"].value;
        let pwd2 = document.forms["register"]["txtPwd"].value;


        //check if all inputs are filled
        let flag = false;
        if (fullnames === "" || email === "" || phone === "" || pwd === "" || pwd2 === "") {
            flag = true;
            console.log("inputs are empty.....");
        }

        if (flag === false) {
            //check if user does not exist
            console.log("User continuing registration");
            let flag2 = false;
            for(let i = 0; i < this.users.length; i++) {
                if (email === this.users[i].email || phone === this.users[i].phone) {
                    //the user exist
                    flag2 = true;
                    break;
                }
            }

            if(flag2 === false) {
                //check if password match
                if (pwd === pwd2) {
                    //register user
                    let newUser = new User(fullnames, email, phone, imgPhoto, pwd);
                    this.users.push(newUser);
                    let text = fullnames + " successfully registered! Please login";
                    alert(text);
                    openLogin();
                } else {
                    alert("Password does not match");
                }
            } else {
                alert("User already exist");
            }
        } else {
            alert("Please fill in all the required input");
        }
    }

    loginUser() {
        //get variables from inputs
        let uid = document.forms["login"]["txtUid"].value;
        let pwd = document.forms["login"]["txtPwd3"].value;

        //check if inputs are empty
        if(uid === "" || pwd === "") {
            alert("Inputs are empty!");
        } else {
            //check if user is registered
            let flag = false;
            for (let i = 0; i< this.users.length; i++) {
                if (uid === this.users[i].email || uid === this.users[i].phone) {
                    flag = true;
                    this.user = this.users[i];
                    break;
                }
            }

            //if user is registere
            if (flag === true) {
                //check if password match
                if (pwd === this.user.pwd) {
                    //login
                    this.userState = "online";
                   displayUser();
                    openHome();
                } else {
                    alert("Incorrect login");
                }
            } else {
                alert("User not registered, please register!")
            }
        }
    }
}

//function to display the books
function displayAllBooks() {
    let bookShelf = document.querySelector("#bookShelf");
    clearBookShelf();
    for (let i =0 ;i<books.length;i++) {
        let img = document.createElement("img")
        img.src = books[i].image;
        let tag = document.createElement("div");
        tag.className = "book";
        let h1 = document.createElement("h1");
        let h1Text = document.createTextNode(books[i].title);
        h1.appendChild(h1Text);
        let h2 = document.createElement("h2");
        let h2Text = document.createTextNode(books[i].author);
        h2.appendChild(h2Text);
        let h3 = document.createElement("h3");
        let h3Text = document.createTextNode(books[i].genre);
        h3.appendChild(h3Text);
        let h4 = document.createElement("h4");
        let h4Text = document.createTextNode(books[i].price);
        h4.appendChild(h4Text);

        let btn = document.createElement("input");
        btn.value = "Add to cart";
        btn.type = "button";


        tag.appendChild(img);
        tag.appendChild(h1);
        tag.appendChild(h2);
        tag.appendChild(h3);
        tag.appendChild(h4);

        bookShelf.appendChild(tag);
    }

    
}

//function to display selected books
function displaySelectedBooks(button) {
    let cbxType = document.querySelector("#cbxType").value;
    let searchWord = document.querySelector("#txtSearch").value;
    
    // check if user is searching by title or author
    if (button === "text") {
        //check if user is searching by title
        if(cbxType === "title") {
            //serach by title
            clearBookShelf();
            for (let i = 0; i< books.length;i++){
                if(searchWord === books[i].title) {
                    let img = document.createElement("img")
                    img.src = books[i].image;
                    let tag = document.createElement("div");
                    tag.className = "book";
                    let h1 = document.createElement("h1");
                    let h1Text = document.createTextNode(books[i].title);
                    h1.appendChild(h1Text);
                    let h2 = document.createElement("h2");
                    let h2Text = document.createTextNode(books[i].author);
                    h2.appendChild(h2Text);
                    let h3 = document.createElement("h3");
                    let h3Text = document.createTextNode(books[i].genre);
                    h3.appendChild(h3Text);
                    let h4 = document.createElement("h4");
                    let h4Text = document.createTextNode(books[i].price);
                    h4.appendChild(h4Text);

                    let btn = document.createElement("input");
                    btn.value = "Add to cart";
                    btn.type = "button";


                    tag.appendChild(img);
                    tag.appendChild(h1);
                    tag.appendChild(h2);
                    tag.appendChild(h3);
                    tag.appendChild(h4);

                    bookShelf.appendChild(tag);
                }
            }
        } else {
            //search by author
            clearBookShelf();
            for (let i = 0; i< books.length;i++){
                if(searchWord === books[i].author) {
                    let img = document.createElement("img")
                    img.src = books[i].image;
                    let tag = document.createElement("div");
                    tag.className = "book";
                    let h1 = document.createElement("h1");
                    let h1Text = document.createTextNode(books[i].title);
                    h1.appendChild(h1Text);
                    let h2 = document.createElement("h2");
                    let h2Text = document.createTextNode(books[i].author);
                    h2.appendChild(h2Text);
                    let h3 = document.createElement("h3");
                    let h3Text = document.createTextNode(books[i].genre);
                    h3.appendChild(h3Text);
                    let h4 = document.createElement("h4");
                    let h4Text = document.createTextNode(books[i].price);
                    h4.appendChild(h4Text);

                    let btn = document.createElement("input");
                    btn.value = "Add to cart";
                    btn.type = "button";


                    tag.appendChild(img);
                    tag.appendChild(h1);
                    tag.appendChild(h2);
                    tag.appendChild(h3);
                    tag.appendChild(h4);

                    bookShelf.appendChild(tag);
                }
            }
        }
    } else {
        //check if user is searching by genre
        //if all is selected
        let bookShelf = document.querySelector("#bookShelf");
        let cbxGenre = document.querySelector("#genre").value;
        if (cbxGenre === "all") {
            clearBookShelf();
            displayAllBooks();
        } else {
            clearBookShelf();
            for (let i = 0; i< books.length;i++){
                if(cbxGenre === books[i].genre) {
                    let img = document.createElement("img")
                    img.src = books[i].image;
                    let tag = document.createElement("div");
                    tag.className = "book";
                    let h1 = document.createElement("h1");
                    let h1Text = document.createTextNode(books[i].title);
                    h1.appendChild(h1Text);
                    let h2 = document.createElement("h2");
                    let h2Text = document.createTextNode(books[i].author);
                    h2.appendChild(h2Text);
                    let h3 = document.createElement("h3");
                    let h3Text = document.createTextNode(books[i].genre);
                    h3.appendChild(h3Text);
                    let h4 = document.createElement("h4");
                    let h4Text = document.createTextNode(books[i].price);
                    h4.appendChild(h4Text);

                    let btn = document.createElement("input");
                    btn.value = "Add to cart";
                    btn.type = "button";


                    tag.appendChild(img);
                    tag.appendChild(h1);
                    tag.appendChild(h2);
                    tag.appendChild(h3);
                    tag.appendChild(h4);

                    bookShelf.appendChild(tag);
                }
            }
        }
        
    }
}

//function to clear bookshelf
function clearBookShelf() {
    let bookShelf = document.querySelector("#bookShelf");
    bookShelf.innerHTML = "<h1></h1>";
    for(let i = 0; i<bookShelf.children.length;i++) {
        bookShelf.removeChild(bookShelf.children[i]);
    }
}

//function to register
function registerUser() {
    app.registerUser();
}

//function to login user
function loginUser() {
    app.loginUser();
}

//function to open register window
function openRegister() {
    document.forms["login"].style.display = "none";
    document.forms["register"].style.display = "grid";
    document.querySelector("#home").style.display = "none";
}

//function to open login window
function openLogin() {
    document.forms["login"].style.display = "grid";
    document.forms["register"].style.display = "none";
    document.querySelector("#home").style.display = "none";
}

//function to open login window
function openHome() {
    document.forms["login"].style.display = "none";
    document.forms["register"].style.display = "none";
    document.querySelector("#home").style.display = "grid";
    displayAllBooks();
}

//function to search by text
function searchByText() {
    displaySelectedBooks("text");
}

//function to search by text
function searchByGenre() {
    displaySelectedBooks("");
}

//function to display user
function displayUser() {
    let userInfo = document.querySelector("#userInfo");
    userInfo.innerHTML = "<h1></h1>";
    for (let i = 0; i< userInfo.children.length; i++) {
        userInfo.removeChild(userInfo.children[i]);
    }

    let text = "";
    text = text + "<img src='Images/pp.jpg' alt='Profile Picture of " + app.user.fullnames + "' />" ;
    text = text + "<p>Welcome to GodGiven Book Store: " + app.user.fullnames + " Email: " + app.user.email + "</p>";
    text = text + "<input type='button' value='Logout' onclick='logout();' />";
/*
    let tmpImg = document.createElement("img");
    tmpImg.src = "./Images/pp.jpg";
    tmpImg.alt = "Profile Picture of " + app.user.fullnames;
    let tmpP = document.createElement("p");
    let tmpInput = document.createElement("input");
    tmpInput.type = "button";
    tmpInput.value = "Logout";
    tmpInput.addEventListener("click", logout());

    userInfo.appendChild(tmpImg);
    userInfo.appendChild(tmpP);
    userInfo.appendChild(tmpInput);
    */
   userInfo.innerHTML = text;
}

//logout function
function logout() {
    app.userState = "offline";
    openLogin();
}


//////the script here/////////////
let books = createBooks();

let app = new StoreApp();
openLogin();
