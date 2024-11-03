import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import BooksContext from "../context/BooksContext";
import CartContext from "../context/CartContext";
import NotFoundPage from "./NotFoundPage";
import imageNotFound from "../images/imageNotFound.png";
import Form from "../components/Form";

export default function SpecificBook({ addToCart }) {
  const books = useContext(BooksContext);
  const cart = useContext(CartContext);
  const params = useParams();
  const book = books.find((book) => book.title === params.title);
  const [bookInCartCount, setBookInCartCount] = useState(
    cart.find((bookInCart) => bookInCart.title === params.title)?.count || 0
  );

  const bookInCartCountHandler = (count) =>
    setBookInCartCount(bookInCartCount + Number(count));

  if (!book) {
    return <NotFoundPage />;
  }

  return (
    <div className="body">
      <div className="specific-book">
        <img
          className="book-cover"
          src={book.image ? book.image : imageNotFound}
          alt="imageNotFound"
        />

        <div className="book-summary">
          <p>
            Book name: <i>{book.title}</i>
          </p>
          <p>
            Book author: <i>{book.author}</i>
          </p>
          <p>Book in cart: {bookInCartCount}</p>
        </div>

        <Form
          addToCart={addToCart}
          title={book.title}
          price={book.price}
          bookInCartCountHandler={bookInCartCountHandler}
        />
      </div>
      <div className="specific-book-description">
        <b>Description:</b>
        <div>{book.description}</div>
      </div>
    </div>
  );
}
