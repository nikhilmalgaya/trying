document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const modal = document.getElementById('couponModal');
    const closeModal = document.getElementById('closeModal');
    const copyCoupon = document.getElementById('copyCoupon');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    u_name: formData.get('u_name'),
                    pass: formData.get('pass')
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Update modal content
                document.getElementById('couponCode').textContent = data.couponCode;
                document.getElementById('discountText').textContent = data.discount;
                
                // Show modal
                modal.style.display = 'block';
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    });
    
    // Copy coupon code
    copyCoupon.addEventListener('click', function() {
        const couponCode = document.getElementById('couponCode').textContent;
        navigator.clipboard.writeText(couponCode)
            .then(() => {
                copyCoupon.textContent = 'Copied!';
                setTimeout(() => {
                    copyCoupon.textContent = 'Copy Code';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy code');
            });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        loginForm.reset();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
