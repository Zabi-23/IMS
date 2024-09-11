const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = require("graphql");
const { Product } = require("../../models/Product");
const ProductType = require("../types/ProductType");
const CriticalProductType = require("../types/CriticalProductType");
const TotalStockValueType = require("../types/TotalStockValueType");
const ManufacturerStockType = require("../types/ManufacturerStockType");
const UniqueManufacturerResultType = require("../types/UniqueManufacturerResultType");

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Fetch a product by ID
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Product.findById(id);
      },
    },
    // Fetch all products with optional filters
    products: {
      type: new GraphQLList(ProductType),
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        sortBy: { type: GraphQLString },
        orderBy: { type: GraphQLString },
        category: { type: GraphQLString },
        manufacturerName: { type: GraphQLString },
        amountInStock: { type: GraphQLInt },
      },
      async resolve(_, args) {
        const limit = args.limit || 10;
        const page = args.page || 1;
        const offset = (page - 1) * limit;
        const sortField = args.sortBy || "name";
        const sortOrder = args.orderBy === "desc" ? -1 : 1;

        const filter = {};
        if (args.category) filter.category = args.category;
        if (args.manufacturerName)
          filter["manufacturer.name"] = args.manufacturerName;
        if (args.amountInStock !== undefined)
          filter.amountInStock = { $lte: args.amountInStock };

        return Product.find(filter)
          .sort({ [sortField]: sortOrder })
          .skip(offset)
          .limit(limit);
      },
    },
    // Fetch total stock value
    totalStockValue: {
      type: TotalStockValueType,
      resolve() {
        return Product.aggregate([
          { $match: { amountInStock: { $exists: true, $ne: null } } },
          {
            $group: {
              _id: null,
              totalValue: { $sum: { $multiply: ["$amountInStock", "$price"] } },
            },
          },
          { $project: { _id: false, totalValue: 1 } },
        ]).then((result) => result[0] || { totalValue: 0 });
      },
    },
    // Fetch total stock value by manufacturer
    totalStockValueByManufacturer: {
      type: new GraphQLList(ManufacturerStockType),
      resolve() {
        return Product.aggregate([
          { $match: { amountInStock: { $exists: true, $ne: null } } },
          {
            $group: {
              _id: "$manufacturer.name",
              totalStockValue: {
                $sum: { $multiply: ["$amountInStock", "$price"] },
              },
            },
          },
          {
            $project: { _id: false, manufacturer: "$_id", totalStockValue: 1 },
          },
        ]);
      },
    },
    // Fetch critical stock products
    criticalStockProducts: {
      type: new GraphQLList(CriticalProductType),
      resolve() {
        return Product.aggregate([
          { $match: { amountInStock: { $lt: 5 } } },
          {
            $project: {
              name: 1,
              manufacturerName: "$manufacturer.name",
              contactName: "$manufacturer.contact.name",
              contactPhone: "$manufacturer.contact.phone",
              contactEmail: "$manufacturer.contact.email",
              amountInStock: 1,
            },
          },
        ]);
      },
    },
    // Fetch low stock products
    lowStockProducts: {
      type: new GraphQLList(ProductType),
      resolve() {
        return Product.find({ amountInStock: { $lt: 10 } });
      },
    },
    // Fetch unique manufacturers
    uniqueManufacturers: {
      type: UniqueManufacturerResultType,
      async resolve() {
        const manufacturers = await Product.aggregate([
          {
            $group: {
              _id: "$manufacturer.name",
              uniqueManufacturer: { $first: "$manufacturer" },
            },
          },
          {
            $project: {
              _id: false,
              name: "$uniqueManufacturer.name",
              country: "$uniqueManufacturer.country",
              website: "$uniqueManufacturer.website",
              description: "$uniqueManufacturer.description",
              address: "$uniqueManufacturer.address",
              contact: "$uniqueManufacturer.contact",
            },
          },
        ]);

        return {
          manufacturers,
          totalManufacturersCount: manufacturers.length,
        };
      },
    },
  },
});

module.exports = RootQuery;
