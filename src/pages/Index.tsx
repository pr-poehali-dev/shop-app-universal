import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ProductModal from '@/components/ProductModal';
import CartSheet, { CartItem } from '@/components/CartSheet';
import CheckoutModal from '@/components/CheckoutModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { toast } = useToast();

  const banners = [
    { id: 1, title: 'Супер распродажа!', subtitle: 'Скидки до 70%', gradient: 'from-primary to-accent' },
    { id: 2, title: 'Новинки недели', subtitle: 'Только свежие товары', gradient: 'from-secondary to-warning' },
    { id: 3, title: 'Бесплатная доставка', subtitle: 'При заказе от 2000₽', gradient: 'from-accent to-primary' },
  ];

  const categories = [
    { id: 1, name: 'Электроника', icon: 'Laptop', color: 'bg-primary' },
    { id: 2, name: 'Одежда', icon: 'Shirt', color: 'bg-secondary' },
    { id: 3, name: 'Дом и сад', icon: 'Home', color: 'bg-accent' },
    { id: 4, name: 'Красота', icon: 'Sparkles', color: 'bg-pink-500' },
    { id: 5, name: 'Спорт', icon: 'Dumbbell', color: 'bg-success' },
    { id: 6, name: 'Игрушки', icon: 'GamepadIcon', color: 'bg-warning' },
  ];

  const products = [
    { id: 1, name: 'Беспроводные наушники Pro', price: 4999, rating: 4.8, reviews: 234, discount: 20, image: '🎧', seller: 'TechStore' },
    { id: 2, name: 'Смарт-часы Ultra', price: 12999, rating: 4.9, reviews: 567, discount: 15, image: '⌚', seller: 'GadgetHub' },
    { id: 3, name: 'Кроссовки Sport Max', price: 3499, rating: 4.7, reviews: 189, discount: 30, image: '👟', seller: 'FashionPro' },
    { id: 4, name: 'Рюкзак Travel Pro', price: 2299, rating: 4.6, reviews: 145, discount: 0, image: '🎒', seller: 'BagsMaster' },
    { id: 5, name: 'Умная колонка Mini', price: 1999, rating: 4.5, reviews: 312, discount: 25, image: '🔊', seller: 'SmartHome' },
    { id: 6, name: 'Электросамокат City', price: 24999, rating: 4.9, reviews: 89, discount: 10, image: '🛴', seller: 'UrbanRide' },
  ];

  const addToCart = (productName: string, quantity: number = 1, size?: string) => {
    const product = products.find(p => p.name === productName);
    if (!product) return;

    const existingItem = cartItems.find(
      item => item.id === product.id && item.size === size
    );

    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        image: product.image,
        seller: product.seller,
        quantity,
        size,
      };
      setCartItems(items => [...items, newItem]);
    }

    toast({
      title: 'Товар добавлен в корзину',
      description: `${productName} ${size ? `(${size})` : ''} × ${quantity}`,
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCartItems(items =>
      items.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: 'Товар удален из корзины',
      variant: 'destructive',
    });
  };

  const openProductModal = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
    toast({
      title: 'Спасибо за заказ!',
      description: 'Мы свяжемся с вами в ближайшее время',
    });
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.discount > 0
      ? Math.round(item.price * (1 - item.discount / 100))
      : item.price;
    return sum + itemPrice * item.quantity;
  }, 0);
  const deliveryFee = cartTotal >= 2000 ? 0 : 300;
  const total = cartTotal + deliveryFee;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Icon name="ShoppingBag" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MarketPlace
              </h1>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Поиск товаров, брендов и категорий..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-input bg-background/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-primary/10 transition-all">
                <Icon name="Heart" size={24} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-xs">
                  3
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative rounded-xl hover:bg-primary/10 transition-all"
              >
                <Icon name="ShoppingCart" size={24} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-secondary text-xs animate-scale-in">
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg">
                <Icon name="User" size={20} className="mr-2" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="animate-fade-in">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <Card className="border-0 shadow-2xl overflow-hidden">
                    <CardContent className={`p-0 h-80 bg-gradient-to-r ${banner.gradient} flex flex-col items-center justify-center text-white relative`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10 text-center space-y-4">
                        <h2 className="text-5xl font-bold drop-shadow-lg">{banner.title}</h2>
                        <p className="text-2xl font-medium opacity-90">{banner.subtitle}</p>
                        <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold shadow-xl animate-bounce-subtle">
                          Смотреть предложения
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        <section className="animate-slide-up">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Icon name="LayoutGrid" className="text-primary" />
            Категории
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-2 hover:border-primary animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 flex flex-col items-center gap-3">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center shadow-lg`}>
                    <Icon name={category.icon as any} className="text-white" size={32} />
                  </div>
                  <p className="font-semibold text-center">{category.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Icon name="Sparkles" className="text-secondary" />
              Топ предложения
            </h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Смотреть все
              <Icon name="ChevronRight" className="ml-1" size={20} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card 
                key={product.id}
                onClick={() => openProductModal(product)}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-muted to-background p-8 flex items-center justify-center h-48 overflow-hidden">
                    {product.discount > 0 && (
                      <Badge className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg">
                        -{product.discount}%
                      </Badge>
                    )}
                    <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/80 backdrop-blur hover:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Icon name="Heart" size={20} className="text-secondary" />
                    </Button>
                  </div>
                  
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Store" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{product.seller}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-warning fill-warning" />
                        <span className="font-semibold">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-end justify-between pt-2">
                      <div>
                        {product.discount > 0 && (
                          <p className="text-sm text-muted-foreground line-through">
                            {product.price}₽
                          </p>
                        )}
                        <p className="text-2xl font-bold text-primary">
                          {product.discount > 0 
                            ? Math.round(product.price * (1 - product.discount / 100))
                            : product.price}₽
                        </p>
                      </div>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.name);
                        }}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-xl shadow-lg"
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-primary via-accent to-secondary rounded-3xl p-12 text-white text-center shadow-2xl animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Станьте продавцом на нашей платформе!</h2>
          <p className="text-xl mb-8 opacity-90">Миллионы покупателей ждут ваши товары</p>
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/seller'}
            className="bg-white text-primary hover:bg-white/90 rounded-full px-10 py-6 text-lg font-semibold shadow-xl"
          >
            <Icon name="Store" size={24} className="mr-2" />
            Начать продавать
          </Button>
        </section>
      </main>

      <footer className="bg-card border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="ShoppingBag" className="text-primary" />
                MarketPlace
              </h3>
              <p className="text-sm text-muted-foreground">
                Современный маркетплейс для продавцов и покупателей
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Как сделать заказ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Оплата</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Доставка</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Возврат товара</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продавцам</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Начать продавать</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Условия работы</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Комиссии</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Поддержка</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@marketplace.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  8 (800) 555-35-35
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 MarketPlace. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <ProductModal
        product={selectedProduct}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
      />

      <CartSheet
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={total}
        onSuccess={handleCheckoutSuccess}
      />
    </div>
  );
};

export default Index;