const createForm = document.querySelector('#create-product-form');




createForm.addEventListener('submit', async element => {
    element.preventDefault()
    const productName = document.querySelector('#product-name').value;
    const productPrice = document.querySelector('#product-price').value;
    const producDescription = document.querySelector('#product-description').value;
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/product',
            data: {
                name: productName,
                price: productPrice,
                description: producDescription
            }
        })
        const productId = res.data.data.newProduct.id
        if (res.data.status) {
            alert('product created successfully')
            location.assign(`/productDetail/${productId}`)
        }
    } catch (error) {
        console.log(error)
    }
})
