import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    { id: 1, name: 'Тормозные колодки', price: 2500, category: 'Тормозная система', image: 'https://cdn.poehali.dev/projects/418923d3-53b0-4a03-976f-0a07af3a002b/files/b9b6c9ca-f7bf-41cb-bc75-8030ad06a9fa.jpg', inStock: true },
    { id: 2, name: 'Масляный фильтр', price: 450, category: 'Фильтры', image: 'https://cdn.poehali.dev/projects/418923d3-53b0-4a03-976f-0a07af3a002b/files/b9b6c9ca-f7bf-41cb-bc75-8030ad06a9fa.jpg', inStock: true },
    { id: 3, name: 'Свечи зажигания (комплект)', price: 1800, category: 'Зажигание', image: 'https://cdn.poehali.dev/projects/418923d3-53b0-4a03-976f-0a07af3a002b/files/b9b6c9ca-f7bf-41cb-bc75-8030ad06a9fa.jpg', inStock: true },
    { id: 4, name: 'Воздушный фильтр', price: 650, category: 'Фильтры', image: 'https://cdn.poehali.dev/projects/418923d3-53b0-4a03-976f-0a07af3a002b/files/b9b6c9ca-f7bf-41cb-bc75-8030ad06a9fa.jpg', inStock: false },
    { id: 5, name: 'Аккумулятор 60Ah', price: 5500, category: 'Электрика', image: 'https://cdn.poehali.dev/projects/418923d3-53b0-4a03-976f-0a07af3a002b/files/b9b6c9ca-f7bf-41cb-bc75-8030ad06a9fa.jpg', inStock: true },
    { id: 6, name: 'Ремень ГРМ', price: 1200, category: 'Двигатель', image: 'https://cdn.poehali.dev/projects/418923d3-53b0-4a03-976f-0a07af3a002b/files/b9b6c9ca-f7bf-41cb-bc75-8030ad06a9fa.jpg', inStock: true },
  ];

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-secondary">АвтоЗапчасти</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveSection('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => setActiveSection('about')} className="text-sm font-medium hover:text-primary transition-colors">О нас</button>
              <button onClick={() => setActiveSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors">Доставка</button>
              <button onClick={() => setActiveSection('warranty')} className="text-sm font-medium hover:text-primary transition-colors">Гарантии</button>
              <button onClick={() => setActiveSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">Контакты</button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {getTotalItems() > 0 ? `Товаров: ${getTotalItems()}` : 'Корзина пуста'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {cartItems.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Итого:</span>
                      <span>{getTotalPrice()} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <>
            <section className="relative py-20 bg-gradient-to-br from-secondary via-secondary/90 to-primary">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in">
                    Качественные автозапчасти для вашего автомобиля
                  </h2>
                  <p className="text-xl text-white/90 mb-8 animate-fade-in">
                    Быстрый подбор по VIN-коду, марке и модели. Доставка по всей России.
                  </p>
                  <Button size="lg" variant="secondary" className="animate-scale-in" onClick={() => setActiveSection('catalog')}>
                    Перейти в каталог
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-12">Подбор запчастей</h3>
                <Tabs defaultValue="vin" className="max-w-2xl mx-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="vin">По VIN-коду</TabsTrigger>
                    <TabsTrigger value="brand">По марке</TabsTrigger>
                    <TabsTrigger value="search">Поиск</TabsTrigger>
                  </TabsList>
                  <TabsContent value="vin" className="space-y-4">
                    <div className="flex gap-2">
                      <Input placeholder="Введите VIN-код (17 символов)" maxLength={17} />
                      <Button>
                        <Icon name="Search" size={20} />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      VIN-код находится в техпаспорте или на кузове автомобиля
                    </p>
                  </TabsContent>
                  <TabsContent value="brand" className="space-y-4">
                    <div className="grid gap-4">
                      <Input placeholder="Марка автомобиля" />
                      <Input placeholder="Модель" />
                      <Input placeholder="Год выпуска" type="number" />
                      <Button className="w-full">Найти запчасти</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="search" className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Поиск по названию или артикулу"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button>
                        <Icon name="Search" size={20} />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-12">Популярные категории</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Тормозная система', 'Фильтры', 'Двигатель', 'Электрика', 'Подвеска', 'Масла и жидкости', 'Зажигание', 'Кузов'].map((category) => (
                    <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer hover-scale">
                      <CardHeader>
                        <CardTitle className="text-center text-base">{category}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8">Каталог товаров</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow hover-scale">
                    <CardHeader>
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                        {product.inStock ? (
                          <Badge variant="secondary">В наличии</Badge>
                        ) : (
                          <Badge variant="destructive">Под заказ</Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        <Icon name="ShoppingCart" size={20} className="mr-2" />
                        {product.inStock ? 'В корзину' : 'Уведомить о поступлении'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold mb-8">О нас</h2>
              <div className="prose prose-lg">
                <p className="text-lg mb-4">
                  Мы — надежный поставщик качественных автозапчастей с 2010 года. Наша миссия — обеспечить каждого автовладельца оригинальными и сертифицированными запчастями по доступным ценам.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <Card>
                    <CardHeader>
                      <Icon name="Package" size={40} className="text-primary mb-2" />
                      <CardTitle>15 000+</CardTitle>
                      <CardDescription>Товаров в каталоге</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Icon name="Users" size={40} className="text-primary mb-2" />
                      <CardTitle>50 000+</CardTitle>
                      <CardDescription>Довольных клиентов</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Icon name="Award" size={40} className="text-primary mb-2" />
                      <CardTitle>14 лет</CardTitle>
                      <CardDescription>На рынке</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold mb-8">Доставка и оплата</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Truck" size={24} className="text-primary" />
                      Способы доставки
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p><strong>Курьерская доставка:</strong> по Москве — 300 ₽, по МО — от 500 ₽</p>
                    <p><strong>Самовывоз:</strong> бесплатно из пунктов выдачи</p>
                    <p><strong>Транспортные компании:</strong> по всей России (СДЭК, Деловые Линии, ПЭК)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="CreditCard" size={24} className="text-primary" />
                      Способы оплаты
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p><strong>Наличные:</strong> при получении курьером или в пункте выдачи</p>
                    <p><strong>Банковские карты:</strong> онлайн на сайте (Visa, MasterCard, МИР)</p>
                    <p><strong>Безналичный расчет:</strong> для юридических лиц</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'warranty' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold mb-8">Гарантии</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Shield" size={24} className="text-primary" />
                      Гарантия качества
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>Все запчасти сертифицированы и имеют официальную гарантию производителя от 6 до 24 месяцев.</p>
                    <p>Мы работаем только с проверенными поставщиками и гарантируем подлинность всех товаров.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="RefreshCw" size={24} className="text-primary" />
                      Возврат и обмен
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>Вы можете вернуть товар в течение 14 дней, если он не подошел или был обнаружен брак.</p>
                    <p>Обмен производится в течение 3 рабочих дней после получения возвращенного товара.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold mb-8">Контакты</h2>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="MapPin" size={24} className="text-primary" />
                      Адрес
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>г. Москва, ул. Автомобильная, д. 15</p>
                    <p className="text-muted-foreground mt-2">Пн-Пт: 9:00 - 20:00, Сб-Вс: 10:00 - 18:00</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Phone" size={24} className="text-primary" />
                      Телефон
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-semibold">+7 (495) 123-45-67</p>
                    <p className="text-muted-foreground mt-2">Звоните с 9:00 до 20:00 по МСК</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Mail" size={24} className="text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">info@avtozapchasti.ru</p>
                    <p className="text-muted-foreground mt-2">Ответим в течение 24 часов</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-secondary text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Wrench" size={24} />
                <h3 className="text-xl font-bold">АвтоЗапчасти</h3>
              </div>
              <p className="text-sm text-white/80">Качественные запчасти для вашего автомобиля с 2010 года</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Двигатель</li>
                <li>Тормозная система</li>
                <li>Подвеска</li>
                <li>Электрика</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>О компании</li>
                <li>Доставка</li>
                <li>Гарантии</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>+7 (495) 123-45-67</li>
                <li>info@avtozapchasti.ru</li>
                <li>г. Москва, ул. Автомобильная, 15</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>© 2024 АвтоЗапчасти. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
