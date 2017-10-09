guard 'shell' do
  watch(/\/*\.rb/) { `touch tmp/restart.txt` }
  watch(/\/views\/*/) { `touch tmp/restart.txt` }
end

guard 'coffeescript', :output => 'public/javascripts' do
  watch /^coffeescripts\/(.*)\.coffee/
end

guard 'sass', :input => 'sass', :output => 'public/stylesheets', :style => :compressed

guard 'livereload' do
  watch(%r{app/views/.+\.(erb|haml|slim)$})
  watch(%r{app/helpers/.+\.rb})
  watch(%r{public/.+\.(css|js|html)})
  watch(%r{config/locales/.+\.yml})
  # Rails Assets Pipeline
  watch(%r{(app|vendor)(/assets/\w+/(.+\.(css|js|html))).*}) { |m| "/assets/#{m[3]}" }
end
