import querySelectorAll from './utils/querySelectorAll';

export default {
    init
};

function init() {
    const elements = querySelectorAll();
    document.querySelector('.paragraph').innerHTML = elements;
}
