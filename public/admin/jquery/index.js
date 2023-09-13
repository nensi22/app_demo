document.getElementById('logout').addEventListener('click', (e) => {
  e.preventDefault()
  Swal.fire({
    title: "Are you sure want to log out?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "#000000",
    cancelButtonColor: "#999999",
    reverseButtons: true,
    focusConfirm: false,
    focusCancel: true,
  })
    .then((e) => {
      if (e.isConfirmed) {
        fetch(`/admin/logout`).then(res => window.location.href = "/admin")
      }
    })
})
