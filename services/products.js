import ClientError from '../helpers/exception/ClientError.js';
import NotFoundError from '../helpers/exception/NotFoundError.js';
import findAllProductsByVideoId from '../repositories/products.js';
import { findVideoById } from '../repositories/videos.js';

const getProductsByVideoIdService = async (id) => {
    const validVideo = await findVideoById(id);
    if (!validVideo) {
        throw new ClientError('Video tidak ditemukan');
    }
    const data = await findAllProductsByVideoId(id);
    if (!data) {
        throw new NotFoundError('Produk tidak ditemukan');
    }
    const products = data.map((obj) => ({
        // eslint-disable-next-line no-underscore-dangle
        product_id: obj._id,
        link_product: obj.url,
        title: obj.title,
        price: obj.price,
    }));
    return products;
};

export default getProductsByVideoIdService;
