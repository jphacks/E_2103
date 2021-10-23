class User < ApplicationRecord
  has_secure_password
  has_secure_token

  validates :user_id, presence: true
  validates :user_id, uniqueness: true
  validates :password_digest, presence: true
  validates :token, uniqueness: true

  has_one :profile, primary_key: :user_id, foreign_key: :user_id
  has_many :project, primary_key: :user_id, foreign_key: :user_id
  has_many :recommend_user, primary_key: :user_id, foreign_key: :user_id
  has_many :recommend_project, primary_key: :user_id, foreign_key: :user_id

  accepts_nested_attributes_for :profile
  accepts_nested_attributes_for :project
end
