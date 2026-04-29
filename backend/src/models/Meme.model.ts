import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import User from './User.model'

interface MemeAttributes {
  id: string
  user_id: string
  original_image_url: string
  processed_image_url: string
  final_image_url: string
  text_content: string
  text_position: {
    x: number
    y: number
    font_size: number
    color: string
  }
  share_count: number
  created_at: Date
  updated_at: Date
}

interface MemeCreationAttributes extends Optional<MemeAttributes, 'id' | 'share_count' | 'created_at' | 'updated_at'> {}

class Meme extends Model<MemeAttributes, MemeCreationAttributes> implements MemeAttributes {
  public id!: string
  public user_id!: string
  public original_image_url!: string
  public processed_image_url!: string
  public final_image_url!: string
  public text_content!: string
  public text_position!: {
    x: number
    y: number
    font_size: number
    color: string
  }
  public share_count!: number
  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Meme.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  original_image_url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  processed_image_url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  final_image_url: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  text_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  text_position: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      x: 50,
      y: 50,
      font_size: 24,
      color: '#FFFFFF'
    }
  },
  share_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'memes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['created_at']
    }
  ]
})

// Associations
User.hasMany(Meme, { foreignKey: 'user_id', as: 'memes' })
Meme.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

export default Meme