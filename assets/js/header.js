 // Gestion du bouton de fermeture du menu
        document.addEventListener('DOMContentLoaded', function() {
            const closeMenuBtn = document.getElementById('closeMenuBtn');
            const navbarCollapse = document.querySelector('.navbar-collapse');

            closeMenuBtn.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });

            // Enable mega dropdowns on hover for desktop
            const dropdownItems = document.querySelectorAll('.mega-dropdown');
            
            function handleHover(e) {
                if (window.innerWidth >= 992) {
                    const dropdown = this.querySelector('.dropdown-menu');
                    const dropdownToggle = this.querySelector('.dropdown-toggle');
                    
                    if (e.type === 'mouseenter') {
                        dropdown.classList.add('show');
                        dropdownToggle.setAttribute('aria-expanded', 'true');
                    } else {
                        dropdown.classList.remove('show');
                        dropdownToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
            
            dropdownItems.forEach(item => {
                item.addEventListener('mouseenter', handleHover);
                item.addEventListener('mouseleave', handleHover);
            });
        });