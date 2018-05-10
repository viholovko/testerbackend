class Report < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  field :answer, type: Hash
  field :test_id, type: String
  field :created_at
  field :updated_at

end
