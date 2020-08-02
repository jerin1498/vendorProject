const deleteButton = document.getElementById('delete-button');
const productId =  document.getElementById('product-id').dataset.productid;



deleteButton.addEventListener('click', async element => {
    const confirmDelete = confirm('Do you want to delete this product ?')
    if (!confirmDelete) return
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/product/${productId}`
        })
        if (res.status === 204) {
            alert('product deleted successfully')
            location.assign(`/productList`)
        }
    } catch (error) {
        console.log(error)
    }
})