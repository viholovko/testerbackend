class Option < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  
  fields :answers, type: Hash
end