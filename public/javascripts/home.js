let wrapper_div = document.querySelector("#wrapper-div");

const tablet_breakpoint = window.matchMedia("(max-width: 768px)");

const cover_container_remover = (breakpoint) => {
    if (breakpoint.matches) { // If media query matches
        wrapper_div.classList.replace("cover-container", "container");
      } else {
        wrapper_div.classList.replace("container", "cover-container");
      }
}

cover_container_remover(tablet_breakpoint) // Call listener function at run time
tablet_breakpoint.addListener(cover_container_remover) // Attach listener function on state changes