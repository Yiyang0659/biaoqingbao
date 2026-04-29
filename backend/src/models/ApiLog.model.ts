import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import User from './User.model'

interface ApiLogAttributes {
  id: string
  user_id?: string
  api_type: 'replicate' | 'openai' | 'cloudinary'
  request_data: any
  response_data: any
  duration_ms: number
  created_at: Date
}

interface ApiLogCreationAttributes extends Optional<ApiLogAttributes, 'id' | 'created_at'> {}

class ApiLog extends Model<ApiLogAttributes, ApiLogCreationAttributes> implements ApiLogAttributes {
  public id!: string
  public user_id?: string
  public api_type!: 'replicate' | 'openai' | 'cloudinary'
  public request_data!: any
  public response_data!: any
  public duration_ms!: number
  public readonly created_at!: Date
}

ApiLog.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  api_type: {
    type: DataTypes.ENUM('replicate', 'openai', 'cloudinary'),
    allowNull: false
  },
  request_data: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  response_data: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  duration_ms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'api_logs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['api_type']
    },
    {
      fields: ['created_at']
    }
  ]
})

// Associations
User.hasMany(ApiLog, { foreignKey: 'user_id', as: 'api_logs' })
ApiLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

export default ApiLog