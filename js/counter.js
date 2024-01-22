export function setupCounter(element) {
  
  $(element).on('click', function(e) {
    e.preventDefault();
    alert('Hello World!');
  });
}
