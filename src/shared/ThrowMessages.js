import Swal from 'sweetalert2';

const throwError = (title) => {
  Swal.fire({
    icon: 'error',
    title,
  });
};

const throwSuccess = (title) => {
  Swal.fire({
    icon: 'success',
    title,
  });
};

export { throwError, throwSuccess };
