module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            displayName: DataTypes.STRING,
            email: DataTypes.INTEGER,
            password: DataTypes.INTEGER,
            image: DataTypes.INTEGER,
        },
        {
            timestamps: false,
            underscored: true,
        }
    );
    User.associate = (models) => {
        User.hasMany(models.BlogPost, {
            foreignKey: 'userId',
            as: 'user'
        });
    }

    return User;
};