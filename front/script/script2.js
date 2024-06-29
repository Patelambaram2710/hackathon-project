document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const gender = document.getElementById('gender').value;
    const diet = document.querySelector('input[name="diet"]:checked').value;
    
    console.log(`Age: ${age}`);
    console.log(`Weight: ${weight} kg`);
    console.log(`Height: ${height} cm`);
    console.log(`Gender: ${gender}`);
    console.log(`Diet: ${diet}`);
    
    alert('Form submitted successfully!');
});
