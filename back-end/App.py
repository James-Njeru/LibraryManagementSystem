from flask import Flask, request, jsonify
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from Models import db, Book, Member, Transaction


app = Flask(__name__)
app.secret_key = "james-njeru"

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root''@localhost/library_system'

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

CORS(app, supports_credentials=True)

db.init_app(app)

with app.app_context():
    db.create_all()

ma = Marshmallow(app)

#member schema
class MemberSchema(ma.Schema):
    class Meta:
        fields = ('id','full_name','contact_number','email','address','outstanding_debt')

member_schema = MemberSchema()
members_schema = MemberSchema(many=True)

#book schema
class BookSchema(ma.Schema):
    class Meta:
        fields = ('id','title','author','isbn','description','publication_year','genre',\
                  'publisher','quantity','available')

book_schema = BookSchema()
books_schema = BookSchema(many=True)

#transaction shema
class TransactionSchema(ma.Schema):
    class Meta:
        fields=('id','book_id','member_id','transaction_type','_date','rent_fee')

transaction_shema = TransactionSchema()
transactions_shema = TransactionSchema(many=True)


@app.route('/')
def hello_world():
    return "<p>Hello World!</p>"


#get all members
@app.route('/members',methods=['GET'])
def list_members():
    all_members = Member.query.all()
    results = members_schema.dump(all_members)
    return jsonify(results)


#get member by id
@app.route('/member/<id>',methods=['GET'])
def member_by_id(id):
    member = Member.query.get(id)
    return member_schema.jsonify(member)


#get member whose outstanding debt <= 500
@app.route('/membersdebt',methods=['GET'])
def list_members_debt():
    all_members = Member.query.filter(Member.outstanding_debt<=500)
    results = members_schema.dump(all_members)
    return jsonify(results)


#update member
@app.route('/member/<id>',methods=['PUT'])
def member_update(id):
    member = Member.query.get(id)

    full_name = request.json["full_name"]
    contact_number = request.json["contact_number"]
    email = request.json["email"]
    address = request.json["address"]
    outstanding_debt = request.json["outstanding_debt"]

    member.full_name = full_name
    member.contact_number = contact_number
    member.email = email
    member.address = address
    member.outstanding_debt = outstanding_debt

    db.session.commit()
    return member_schema.jsonify(member)

#update outstanding debt
@app.route('/debtupdate/<id>',methods=['PUT'])
def debt_update(id):
    member = Member.query.get(id)

    outstanding_debt = request.json["outstanding_debt"]
    member.outstanding_debt = outstanding_debt

    db.session.commit()
    return member_schema.jsonify(member)


#delete member
@app.route('/deletemember/<id>',methods=['DELETE'])
def delete_member(id):
    member = Member.query.get(id)
    db.session.delete(member)
    db.session.commit()
    return member_schema.jsonify(member)


#add new member
@app.route('/member',methods=['POST'])
def new_member():
    full_name = request.json["full_name"]
    contact_number = request.json["contact_number"]
    email = request.json["email"]
    address = request.json["address"]
    outstanding_debt = request.json["outstanding_debt"]
    
    member = Member(full_name=full_name,contact_number=contact_number,\
                    email=email,address=address,outstanding_debt=outstanding_debt)
    
    db.session.add(member)
    db.session.commit()
    return member_schema.jsonify(member)









#get all books
@app.route('/books',methods=['GET'])
def list_books():
    all_books = Book.query.all()
    results = books_schema.dump(all_books)
    return jsonify(results)


#get book by id
@app.route('/book/<id>',methods=['GET'])
def book_by_id(id):
    book = Book.query.get(id)
    return book_schema.jsonify(book)


#filter book by name/author
@app.route('/searchby/<nameorauthor>',methods=['GET'])
def search_by_name(nameorauthor):
    book = Book.query.filter((Book.title==nameorauthor) | (Book.author==nameorauthor)).all()
    return books_schema.jsonify(book)


#get book by author
#@app.route('/bookbyauthor/<bookauthor>',methods=['GET'])
#def search_by_author(bookauthor):
#    book = Book.query.filter_by(author=bookauthor).all()
#    return books_schema.jsonify(book)


#update book
@app.route('/book/<id>',methods=['PUT'])
def book_update(id):
    book = Book.query.get(id)

    title = request.json["title"]
    author = request.json["author"]
    isbn = request.json["isbn"]
    description = request.json["description"]
    publication_year = request.json["publication_year"]
    genre = request.json["genre"]
    publisher = request.json["publisher"]
    quantity = request.json["quantity"]
    available = request.json["available"]

    book.title = title
    book.author = author
    book.isbn = isbn
    book.description = description
    book.publication_year = publication_year
    book.genre = genre
    book.publisher = publisher
    book.quantity = quantity
    book.available = available

    db.session.commit()
    return book_schema.jsonify(book)


#delete book
@app.route('/deletebook/<id>',methods=['DELETE'])
def delete_book(id):
    book = Book.query.get(id)
    db.session.delete(book)
    db.session.commit()
    return book_schema.jsonify(book)


#add new book
@app.route('/book',methods=['POST'])
def new_book():
    title = request.json["title"]
    author = request.json["author"]
    isbn = request.json["isbn"]
    description = request.json["description"]
    publication_year = request.json["publication_year"]
    genre = request.json["genre"]
    publisher = request.json["publisher"]
    quantity = request.json["quantity"]
    available = request.json["available"]
    
    book = Book(title=title, author=author, isbn=isbn, description=description, \
                publication_year=publication_year, genre=genre, publisher=publisher, \
                    quantity=quantity, available=available)
    
    db.session.add(book)
    db.session.commit()
    return book_schema.jsonify(book)







#save transaction
@app.route('/transaction',methods=['POST'])
def issue_book():
    book_id = request.json["book_id"]
    member_id = request.json["member_id"]
    transaction_type = request.json["transaction_type"]
    _date = request.json["_date"]
    rent_fee = request.json["rent_fee"]

    transaction = Transaction(book_id=book_id, member_id=member_id, \
                              transaction_type=transaction_type, _date=_date, rent_fee=rent_fee)
    db.session.add(transaction)
    db.session.commit()
    return transaction_shema.jsonify(transaction)


#get all transaction
@app.route('/transactions',methods=['GET'])
def list_transactions():
    transactions = db.session.query(Transaction) \
    .join(Book, Transaction.book_id == Book.id) \
    .join(Member, Transaction.member_id == Member.id) \
    .add_columns(Transaction.id, Transaction.book_id, Transaction.member_id, Transaction._date, \
                 Book.title.label("book_title"), Member.full_name, Transaction.rent_fee).all()

    transactions_json = [
    {"id": transaction.id, "book_id":transaction.book_id, "member_id":transaction.member_id, \
     "book_title": transaction.book_title, "full_name": transaction.full_name, \
        "rent_fee": transaction.rent_fee, "_date": transaction._date}
    for transaction in transactions
    ]
    return jsonify(transactions_json)


#update transaction
@app.route('/transaction/<id>',methods=['PUT'])
def transaction_update(id):
    transaction = Transaction.query.get(id)

    #book_id = request.json["book_id"]
    #member_id = request.json["member_id"]
    transaction_type = request.json["transaction_type"]
    _date = request.json["_date"]
    rent_fee = request.json["rent_fee"]

    #transaction.book_id = book_id
    #transaction.member_id = member_id
    transaction.transaction_type = transaction_type
    transaction._date = _date
    transaction.rent_fee = rent_fee

    db.session.commit()
    return transaction_shema.jsonify(transaction)
    

if __name__ == "__main__":
    app.run(debug=True)