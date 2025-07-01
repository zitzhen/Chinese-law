const legal_page = document.getElementById("legal_page");

function add_law(name,date_of_enactment,reference_number,Timeliness){
    legal_page.innerHTML +=`
                    <tr>
                        <td>
                            <a href="#" class="law-name">${name}</a>
                        </td>
                        <td>${date_of_enactment}<td>
                        <td>${date_of_implementation}</td>
                        <td>${reference_number}</td>
                        <td><span class="law-status status-valid">${Timeliness}</span></td>
                        <td><a href="#">查看</a></td>
                    </tr>`
}