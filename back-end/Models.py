from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Book(db.Model):
    __tablename__ = "books"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    isbn = db.Column(db.String(13), unique=True)
    description = db.Column(db.Text)
    publication_year = db.Column(db.Integer)
    genre = db.Column(db.String(50))
    publisher = db.Column(db.String(255))
    quantity = db.Column(db.Integer, nullable=False)
    available = db.Column(db.Integer, nullable=False, default=quantity)
    # Relationships
    child = db.relationship("Transaction",back_populates="book")


class Member(db.Model):
    __tablename__ = "members"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(255), nullable=False)
    contact_number = db.Column(db.String(20))
    email = db.Column(db.String(255), unique=True)
    address = db.Column(db.Text)
    outstanding_debt = db.Column(db.DECIMAL(10, 2), default=0)
    # Relationships
    child2 = db.relationship("Transaction", back_populates="member")


class Transaction(db.Model):
    __tablename__ = "transactions"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"), nullable=False)
    transaction_type = db.Column(db.Enum("issue", "return"), nullable=False)
    _date = db.Column(db.Date, nullable=False)
    rent_fee = db.Column(db.DECIMAL(10, 2), default=0)
    # Relationships
    book = db.relationship("Book",back_populates="child")
    member = db.relationship("Member",back_populates="child2")
    