require_relative 'boot'

require "action_controller/railtie"
require "action_mailer/railtie"
require "action_cable"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BackendRealMoney
  class Application < Rails::Application
      config.i18n.enforce_available_locales = false
      config.i18n.available_locales = [:en, :ua]
      config.i18n.default_locale = :en
      config.assets.initialize_on_precompile = true
      config.browserify_rails.commandline_options = '-t babelify'
      config.assets.paths << Rails.root.join('node_modules')
      config.time_zone = 'Europe/Berlin'
      config.generators do |g|
        g.orm :mongoid
      end
  end
end
