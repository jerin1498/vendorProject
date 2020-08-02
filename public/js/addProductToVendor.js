const form = document.getElementById('add-product-form');
const showDetail = document.querySelector('.show-detail');
const vendorId = document.getElementById('vendor-id').dataset.vendorid;
let checkboxCollections = document.getElementsByClassName('check-box');
let checkboxArray = Array.from(checkboxCollections);



form.addEventListener('click', async element => {
    const productId = element.target.getAttribute('value')
    if (!productId) return
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/product/${productId}`
        })
        if (res.data.status === 'success') {  
            const product = res.data.data.product
            showDetail.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Rs ${product.price}</li>
                </ul>
            </div>   
            `
            
        }
    } catch (error) {
        console.log(error.response.data.message)
    }
})


form.addEventListener('submit', async element => {
    element.preventDefault()
    const checkedList = checkboxArray.filter(ele => ele.checked).map(ele => ele.getAttribute('value'))  
    if (checkedList.length > 0) {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/vendor/add/product`,
                data: {
                    productId: checkedList,
                    vendorId: vendorId
                }
            })
            console.log(res)
            console.log(res.data.status)
            if (res.data.status === 'success') {
                alert('product added successfully')
                location.assign(`/vendorDetail/${vendorId}`)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    } 
    

})