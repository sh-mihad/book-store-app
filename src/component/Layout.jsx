import { useEffect, useState } from "react";
import useAxiosGet from "../common/useAxosGet";

const Layout = () => {
  const [booksDto, getBooksDto] = useAxiosGet();
  const [authorList, setAuthorList] = useState();
  const [categoryList, setCategoryList] = useState();
  const [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    getBooksDto(`http://localhost:9000/books`);
  }, []);
  useEffect(() => {
    if (booksDto?.length > 0) {
      let dynamicArr = [];
      booksDto.forEach((item) => {
        if (
          dynamicArr.some((itm) => itm?.category === item?.category) === false
        ) {
          dynamicArr.push(item);
        }
      });
      setCategoryList(dynamicArr);
      let dynamicAuthor = [];
      booksDto.forEach((item) => {
        if (
          dynamicAuthor.some((itm) => itm?.author === item?.author) === false
        ) {
          dynamicAuthor.push(item);
        }
      });
      setAuthorList(dynamicAuthor);
    }
  }, [booksDto]);

  const onFilterAction = (e) => {
    if (e.target.checked) {
      setSelectedList([...selectedList, e.target.value]);
    }
    if (e.target.checked === false && selectedList?.length > 0) {
      const updatedList = selectedList?.filter((item) => {
        return item !== e.target.value;
      });
      setSelectedList(updatedList);
    }
  };
  return (
    <section className="flex mt-10 gap-5 w-11/12 mx-auto">
      <div className="w-[22%]">
        <div className="bg-white p-5">
          <h3 className="text-xl font-semibold mb-2">Author</h3>
          {authorList?.map((book) => (
            <div key={book.id} className="flex items-center">
              <input
                type="checkbox"
                id={`${book?.author}`}
                value={book?.author}
                onChange={(e) => onFilterAction(e)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-300 border-gray-300 rounded"
              />
              <label htmlFor={`${book?.author}`} className="text-gray-700">
                {`${book?.author}`}
              </label>
            </div>
          ))}
        </div>
        <div className="bg-white p-5">
          <h3 className="text-xl font-semibold mb-2">Category</h3>
          {categoryList?.map((book) => (
            <div key={book.id} className="flex items-center">
              <input
                type="checkbox"
                value={book?.category}
                id={`${book?.category}`}
                onChange={(e) => onFilterAction(e)}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-300 border-gray-300 rounded"
              />
              <label htmlFor={`${book?.category}`} className="text-gray-700">
                {`${book?.category}`}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[78%] bg-white p-10">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-semibold mb-4">Book Collection</h1>
          <div className="grid grid-cols-3 gap-4 p-4">
            {booksDto
              ?.filter((item) =>
                selectedList?.length > 0
                  ? selectedList?.includes(item?.author) ||
                    selectedList?.includes(item?.category)
                  : item
              )
              ?.map((book) => (
                <div
                  key={book.id}
                  className="bg-white p-4 rounded-md shadow-md"
                >
                  <img
                    src={book.thumbnail}
                    alt={book.name}
                    className="mb-2 rounded-md"
                  />
                  <h2 className="text-lg font-semibold">{book.name}</h2>
                  <p className="text-gray-600">{book.author}</p>
                  <p className="text-gray-800 font-medium">{book.price}</p>
                  <p className="text-blue-500">{book.category}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
