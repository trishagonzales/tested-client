import faker from 'faker';
import _ from 'lodash';
import { Product } from '../types/Product.types';

export function genProdData() {
  const productID = faker.random.alphaNumeric(5);

  return {
    id: productID,
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    stock: faker.random.number(20),
    rating: faker.random.number(5),
    description: faker.lorem.paragraphs(4),
    datePosted: faker.date.future(),
    reviews: [
      {
        id: faker.random.alphaNumeric(5),
        author: {
          id: faker.random.alphaNumeric(5),
          avatar: faker.image.imageUrl(),
          username: faker.internet.userName(),
        },
        rating: faker.random.number(5),
        comment: faker.lorem.sentence(),
        productID,
        datePosted: faker.date.future(),
      },
      {
        id: faker.random.alphaNumeric(5),
        author: {
          id: faker.random.alphaNumeric(5),
          avatar: faker.image.imageUrl(),
          username: faker.internet.userName(),
        },
        rating: faker.random.number(5),
        comment: faker.lorem.sentence(),
        productID,
        datePosted: faker.date.future(),
      },
      {
        id: faker.random.alphaNumeric(5),
        author: {
          id: faker.random.alphaNumeric(5),
          avatar: faker.image.imageUrl(),
          username: faker.internet.userName(),
        },
        rating: faker.random.number(5),
        comment: faker.lorem.sentence(),
        productID,
        datePosted: faker.date.future(),
      },
    ],
  };
}

export function genCartData(productID: string, products: Product[], quantity?: number) {
  return {
    id: faker.random.alphaNumeric(5),
    product: products.find(prod => prod.id === productID),
    quantity: quantity ? quantity : 1,
    isIncluded: true,
  };
}
