guard 'shell' do
  watch(/\/*\.rb/) { `touch tmp/restart.txt` }
  watch(/\/views\/*/) { `touch tmp/restart.txt` }
end

guard 'livereload' do
  watch(%r{public/.+\.(css|js)})
  watch(%r{views/.+\.haml})
  watch(%r{.+\.rb})
end

guard 'coffeescript', :output => 'public/javascripts' do
  watch /^coffeescripts\/(.*)\.coffee/
end

guard 'sass', :input => 'sass', :output => 'public/stylesheets', :style => :compressed

guard 'coffeescript', :input => 'app/assets/javascripts'

guard 'livereload' do
  watch(%r{app/views/.+\.(erb|haml|slim)$})
  watch(%r{app/helpers/.+\.rb})
  watch(%r{public/.+\.(css|js|html)})
  watch(%r{config/locales/.+\.yml})
  # Rails Assets Pipeline
  watch(%r{(app|vendor)(/assets/\w+/(.+\.(css|js|html))).*}) { |m| "/assets/#{m[3]}" }
end

guard 'sass', :input => 'sass', :output => 'css'

# Add files and commands to this file, like the example:
#   watch(%r{file/path}) { `command(s)` }
#
guard 'shell' do
  watch(/(.*).txt/) {|m| `tail #{m[0]}` }
end
