class Record < ApplicationRecord
  include Mongoid::Document
  include Mongoid::Timestamps
  # include Mongoid::Paperclip

  field :test_id, type: String
  field :record,  type: Array

  def self.search_query(params)
    query_params = {}

    query_params[:id] = params[:id] if params[:id].present?
    query_params[:test_id] = %r{.*#{params[:test_id]}.*}i if params[:test_id].present?

    sort_column = params[:sort_column] || :created_at
    sort_type = params[:sort_type] || :desc

    Record.where(query_params).order(sort_column => sort_type)
  end

end
