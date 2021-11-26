// $(document).ready(function() {
//     var max_fields = 10;
//     var wrapper = $(".container1");
//     var add_button = $(".add_form_field");

//     var x = 1;
//     $(add_button).click(function(e) {
//         e.preventDefault();
//         if (x < max_fields) {
//             x++;
//             $(wrapper).append('<div><input type="text" name="mytext[]"/><a href="#" class="delete">Delete</a></div>'); //add input box
//         } else {
//             alert('You Reached the limits')
//         }
//     });

//     $(wrapper).on("click", ".delete", function(e) {
//         e.preventDefault();
//         $(this).parent('div').remove();
//         x--;
//     })
// });

function showProject() {
    let div = document.createElement('div');
    let title = document.createElement('input');
    title.setAttribute('type', 'text')
    let description = document.createElement('input');
    description.setAttribute('type', 'text');
    description.style.display = 'block';
    div.appendChild(title);
    div.appendChild(description);
    document.getElementById('project').appendChild(div);
}

function showDescription() {

}

function showSkills() {
    let div = document.createElement('div');

    let title = document.createElement('input');
    title.type = 'text';
    title.name = 'resume[skills[title]]';
    title.style.display = 'block';

    let description = document.createElement('input');
    description.type = 'text';
    description.name = 'resume[skills[description]]';
    description.style.display = 'block';

    div.appendChild(title);
    div.appendChild(description);
    document.getElementById('skills').appendChild(div);
}