(function () {
    document.getElementById('autocomplete-input').addEventListener('keyup', (ele) => {
        document.getElementById('autocomplete-control').classList.add('is-loading');
        debounce(fireSearch, 1000)(ele.target.value);
    });
    const fireSearch = async (input) => {
        document.getElementById('autocomplete-dropdown-items').innerHTML = '';
        const response = await remoteCall(input)
        document.getElementById('autocomplete-control').classList.remove('is-loading');

        if(!response.suggestions){
            document.getElementById('dropdown-menu').classList.add('is-hidden');
            return;
        }
        response.suggestions.forEach(item => {
                document.getElementById('dropdown-menu').classList.remove('is-hidden');
                document.getElementById('autocomplete-dropdown-items')
                    .insertAdjacentHTML('beforeend', `
                        <a href="#" class="dropdown-item">
                            ${item.label}
                        </a>
                    `)
            });
    }

    async function remoteCall(input) {
        const response = await fetch(`/api/autocomplete/${input}`);
        return await response.json();
    }
    var inDebounce
    const debounce = (func, delay) => {
        
        return function() {
          const context = this
          const args = arguments
          clearTimeout(inDebounce)
          inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
      }

      var inThrottle
      const throttle = (func, limit) => {
        return function() {
          const args = arguments
          const context = this
          if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
          }
        }
      }
}());

