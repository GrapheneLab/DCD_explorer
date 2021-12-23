export const scrollToElem = e => {
    e.preventDefault();

    const position = document.getElementById(e.target.hash.substr(1)).getBoundingClientRect();

    let isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

    let options = {
        "behavior": "smooth",
        "left": position.left,
        "top": position.top
    };

    if (isSmoothScrollSupported) {
        // Native smooth scrolling
        window.scrollTo(options);
    } else {
        // Old way scrolling without effects
        window.scrollTo(options.left, options.top);
    }
};