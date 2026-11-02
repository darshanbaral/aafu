Remove-Item -Recurse ./public
hugo
npx pagefind --site public --serve
