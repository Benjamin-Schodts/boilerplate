import main from './main';
import '../scss/style.scss';

function init() {
    main.init();
}

// This script is loaded dynamically, so it could be that DOMContentLoaded was already fired
if (document.readyState === 'interactive') {
    init();
} else {
    document.addEventListener('DOMContentLoaded', () => {
        init();
    });
}
