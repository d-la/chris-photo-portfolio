# chris-photo-portfolio
Photography portfolio website for a friend. Node.js on the server. React to be implemented later for front end


API Structure
<table>
        <thead>
            <th>Verb</th>
            <th>Route</th>
            <th>Description</th>
        </thead>
        <tbody>
            <tr>
                <td colspan="3"><strong>CATEGORY</strong></td>   
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/category</td>
                <td>Lists all categories</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/api/category</td>
                <td>Creates a new category</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/category/:id</td>
                <td>Retrieve a specific category data</td>
            </tr>
            <tr>
                <td>PUT</td>
                <td>/api/category/:id</td>
                <td>Update a specific category data</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>/api/category/:id</td>
                <td>Deletes a specific category (ALSO DELETES ALL SUB CATEGORIES AND PHOTOS ASSOCIATED)</td>
            </tr>
            <tr>
                <td colspan="3"><strong>SUBCATEGORIES</strong></td>   
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/subcategory</td>
                <td>Lists all subcategories</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/api/subcategory</td>
                <td>Creates a new subcategory</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/subcategory/:id</td>
                <td>Retrieve a specific subcategory data</td>
            </tr>
            <tr>
                <td>PUT</td>
                <td>/api/subcategory/:id</td>
                <td>Update a specific subcategory data</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>/api/subcategory/:id</td>
                <td>Deletes a specific subcategory (ALSO DELETES ALL PHOTOS ASSOCIATED)</td>
            </tr>
            <tr>
                <td colspan="3"><strong>PHOTOS</strong></td>   
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/photo</td>
                <td>Lists all photos</td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/api/photo</td>
                <td>Creates a new photo</td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/api/photo/:id</td>
                <td>Retrieve a specific photos data</td>
            </tr>
            <tr>
                <td>PUT</td>
                <td>/api/photo/:id</td>
                <td>Update a specific photos data</td>
            </tr>
            <tr>
                <td>DELETE</td>
                <td>/api/photo/:id</td>
                <td>Deletes a specific photo</td>
            </tr>
        </tbody>
    </table>
