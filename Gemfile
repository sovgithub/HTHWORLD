source "https://rubygems.org"

gem "fastlane"

gem "dotenv", "~> 2.5"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)