import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const createProductScreen = ({ match, history }) => {
    const productId = match.params.id

    const [formData, setFormData] = useState({})
    const [file, setFile] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = productCreate


    const uploadFileHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setFormData(product)
            }
        }
    }, [dispatch, history, productId, product, successCreate])

    const handleSubmit = () => {

        const newFormData = new FormData();
        newFormData.append('name', formData.name);
        newFormData.append('image', file);
        newFormData.append('price', formData.price);
        newFormData.append('brand', formData.brand);
        newFormData.append('category', formData.category);
        newFormData.append('description', formData.description);
        newFormData.append('countInStock', formData.countInStock);
        createProduct(newFormData)
    };

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingCreate && <Loader />}
                {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name='name'
                                type='name'
                                placeholder='Enter name'
                                onChange={handleOnChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                price='price'
                                type='number'
                                placeholder='Enter price'
                                onChange={handleOnChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                name='image'
                                type='text'
                                placeholder='Enter image url'
                                onChange={handleOnChange}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                name='brand'
                                type='text'
                                placeholder='Enter brand'
                                onChange={handleOnChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                name='countInStock'
                                type='number'
                                placeholder='Enter countInStock'
                                onChange={handleOnChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                name='category'
                                type='text'
                                placeholder='Enter category'
                                onChange={handleOnChange}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name='description'
                                type='text'
                                placeholder='Enter description'
                                onChange={handleOnChange}
                            ></Form.Control>
                        </Form.Group>

                        <Button onClick={handleSubmit} type='button' variant='primary'>
                            Create
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default createProductScreen
