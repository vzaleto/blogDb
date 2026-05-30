const {Category} = require("../models");

exports.createCategory = async (req, res) => {
    console.log(req.body)
    const {name, slug, description} = req.body;
    try {
        const [category, created] = await Category.findOrCreate({
            where: {
                slug
            },
            defaults: {
                name,
                slug,
                description
            }
        });
        if (!created) {
            return res.status(400).json({message: 'Record already exists'})
        }
        return res.status(201).json({message: 'New record created', category})

    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to create categoryCreate or Record already exists'})
    }
}

exports.getCategories = async (req, res) => {

    try {
        const category = await Category.findAll();
        res.status(200).json(category)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to get categories'})
    }

}

exports.updateCategory = async (req, res) => {
}