import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ history }) => {
  const [formData, setFormData] = useState()
  const [file, setFile] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error } = productDetails

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/admin/productlist')

      if (!userInfo || !userInfo.isAdmin) {
        history.push('/login')
      }
    }
  }, [dispatch, history, successCreate, userInfo])

  const uploadFileHandler = (e) => {
    setFile(e.target.files[0])
  }

  const onFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('price', formData.price);
    newFormData.append('image', file);
    newFormData.append('brand', formData.brand);
    newFormData.append('category', formData.category);
    newFormData.append('description', formData.description);
    newFormData.append('countInStock', formData.countInStock);
    dispatch(
      createProduct(newFormData)
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} encType="multipart/form-data">
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='name'
                type='name'
                placeholder='Enter name'
                onChange={onFileChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                name='price'
                type='text'
                placeholder='Enter price'
                onChange={onFileChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                name='image'
                type='text'
                placeholder='Enter image url'
                value={file.name}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                name='brand'
                type='text'
                placeholder='Enter brand'
                onChange={onFileChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                name='countInStock'
                type='number'
                placeholder='Enter countInStock'
                onChange={onFileChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                name='category'
                type='text'
                placeholder='Enter category'
                onChange={onFileChange}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name='description'
                type='text'
                placeholder='Enter description'
                onChange={onFileChange}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
