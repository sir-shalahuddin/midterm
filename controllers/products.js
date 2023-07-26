import getProductsByVideoIdService from '../services/products.js';

const getProductsByVideoId = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await getProductsByVideoIdService(id);
        return res.status(200).json({
            status: 'success',
            data: products,
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message);
        return res.status(e.statusCode || 500).json({
            status: 'fail',
            message: e.statusCode ? e.message : 'something wrong from side',
        });
    }
};

export default getProductsByVideoId;
