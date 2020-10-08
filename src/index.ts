import app from './app';

function main() {
  app.listen(app.get('PORT'), () => {
    console.log(`Server on Port ${app.get('PORT')}`);
  });
}
main();
