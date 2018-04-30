class Role < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Paperclip

  field :name, type: String

  validates :name, presence: true, uniqueness: true

  def self.search_query(params)
    query_params = {}

    query_params[:id] = params[:id] if params[:id].present?
    query_params[:name] = %r{.*#{params[:name]}.*}i if params[:name].present?

    sort_column = params[:sort_column] || :created_at
    sort_type = params[:sort_type] || :desc

    Role.where(query_params)
        .order(sort_column => sort_type)
  end

end