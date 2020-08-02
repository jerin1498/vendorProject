const createForm = document.querySelector('#create-product-form');




createForm.addEventListener('submit', async element => {
    element.preventDefault()
    const vendorName = document.querySelector('#vendor-name').value;
    const vendorEmail = document.querySelector('#vendor-email').value;
    const vendorMobile = document.querySelector('#vendor-mobile').value;
    const vendorAddress = document.querySelector('#vendor-address').value;
    console.log(vendorName, vendorEmail, vendorMobile, vendorAddress)
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/vendor',
            data: {
                name: vendorName,
                address: vendorAddress,
                email: vendorEmail,
                mobileNumber: vendorMobile
            }
        })
        const vendorId = res.data.data.newVendor._id
        if (res.data.status) {
            alert('product created successfully')
            location.assign(`/vendorDetail/${vendorId}`)
        }
    } catch (error) {
        console.log(error)
    }
})
