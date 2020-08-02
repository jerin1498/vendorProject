const deleteButton = document.getElementById('delete-button');
const productId =  document.getElementById('vendor-id').dataset.vendorid;



deleteButton.addEventListener('click', async element => {
    const confirmDelete = confirm('Do you want to delete this Vendor ?')
    if (!confirmDelete) return
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/vendor/${productId}`
        })
        if (res.status === 204) {
            alert('vendor deleted successfully')
            location.assign(`/vendorList`)
        }
    } catch (error) {
        console.log(error)
    }
})