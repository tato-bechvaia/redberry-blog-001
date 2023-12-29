const apiToken = '58c416e87c89e38f9b9c1bd71ee5653f01580d893a1221ee42dc65028c98268a';
const apiUrl = 'https://api.blog.redberryinternship.ge/api';

export const getAllBlogs = async function() {
    try {  
        const response = await fetch(`${apiUrl}/blogs`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${apiToken}`
            },
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const allBlogsData = await response.json();
        return allBlogsData;
    } catch (error) {
        console.error('Error fetching data, Could not get blogs', error.message);
    }
};

export const getAllCategories = async function() {
    try {

        const response = await fetch(`${apiUrl}/categories`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const categoriesData = await response.json();
        return categoriesData;
    } catch (error) {
        console.error('Error fetching data, Could not get categories', error.message);
    }
};

export const createBlog = async function(blogData) {
    try {
        const formData = new FormData();
        formData.append("title", blogData.title);
        formData.append("description", blogData.description);
        formData.append("author", blogData.author);
        formData.append("publish_date", blogData.publish_date);
        formData.append("categories", JSON.stringify(blogData.categories));
        formData.append("email", blogData.email);
        formData.append("image", blogData.image);
        
        const response = await fetch(`${apiUrl}/blogs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                accept: "application/json",
            },
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Failed to add blog');
        }

    } catch (error) {
        console.error('Error adding blog:', error.message);
    }
};

export const getBlogById = async function(id) {
    try {
        const response = await fetch(`${apiUrl}/blogs/${id}`, {
            method: 'GET',
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get blog with an id of ${id}`);
        }

        const blogData = await response.json();
        return blogData;
    } catch (error) {
        console.error(`Error getting blog with an id of ${id}`);
    }
}

export const loginUser = async function(email) {
    try {
        const formData = new FormData();
        formData.append('email', email);
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                accept: "application/json",
            },
            body: formData
        });

        console.log(response);
        

        if(!response.ok){
            throw new Error(`Failed to get user with an email of ${email}`);
        }

        console.log(response);

        return response;
    } catch (error) {
        console.error(`Error getting user with an email of ${email}`);
    }
}
