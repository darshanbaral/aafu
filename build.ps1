Remove-Item -Recurse ./public
hugo
npx -y pagefind --site public --serve
