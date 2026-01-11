import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  discount: number;
  image: string;
  seller: string;
}

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (productName: string) => void;
}

const ProductModal = ({ product, open, onClose, onAddToCart }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  if (!product) return null;

  const finalPrice = product.discount > 0 
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['🔵', '⚫', '⚪', '🟢'];

  const reviews = [
    { id: 1, author: 'Алексей М.', rating: 5, text: 'Отличный товар! Качество на высоте, доставка быстрая.', date: '15 янв 2024' },
    { id: 2, author: 'Мария К.', rating: 4, text: 'Хорошее качество за свою цену. Рекомендую!', date: '10 янв 2024' },
    { id: 3, author: 'Дмитрий П.', rating: 5, text: 'Превзошло ожидания! Буду заказывать еще.', date: '5 янв 2024' },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative bg-gradient-to-br from-muted to-background rounded-3xl p-12 flex items-center justify-center min-h-[400px] shadow-lg">
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-secondary text-white px-4 py-2 text-lg font-bold rounded-full shadow-lg">
                  -{product.discount}%
                </Badge>
              )}
              <div className="text-[150px] animate-scale-in">
                {product.image}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="bg-muted rounded-xl p-4 flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors border-2 border-transparent hover:border-primary"
                >
                  <span className="text-3xl">{product.image}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Store" size={18} className="text-muted-foreground" />
                <span className="text-sm text-primary font-medium hover:underline cursor-pointer">
                  {product.seller}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={20} className="text-warning fill-warning" />
                  <span className="text-xl font-semibold">{product.rating}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-muted-foreground hover:underline cursor-pointer">
                  {product.reviews} отзывов
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              {product.discount > 0 && (
                <p className="text-xl text-muted-foreground line-through">
                  {product.price}₽
                </p>
              )}
              <div className="flex items-end gap-3">
                <p className="text-4xl font-bold text-primary">
                  {finalPrice}₽
                </p>
                {product.discount > 0 && (
                  <Badge className="bg-success text-white px-3 py-1 mb-1">
                    Экономия {product.price - finalPrice}₽
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Размер</label>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white shadow-lg'
                          : 'border-input hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Цвет</label>
                <div className="flex gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-12 h-12 rounded-xl border-2 border-input hover:border-primary hover:scale-110 transition-all flex items-center justify-center text-2xl"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Количество</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-xl"
                  >
                    <Icon name="Minus" size={18} />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-xl"
                  >
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                size="lg"
                onClick={() => {
                  onAddToCart(product.name);
                  onClose();
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg text-lg py-6"
              >
                <Icon name="ShoppingCart" size={22} className="mr-2" />
                В корзину — {finalPrice * quantity}₽
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-2"
              >
                <Icon name="Heart" size={22} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Truck" size={18} className="text-accent" />
                <span>Доставка 1-3 дня</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Shield" size={18} className="text-success" />
                <span>Гарантия</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="RefreshCw" size={18} className="text-warning" />
                <span>Возврат 14 дней</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="specifications">Характеристики</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы ({product.reviews})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-4 py-4">
            <p className="text-muted-foreground leading-relaxed">
              {product.name} — это премиальное решение для тех, кто ценит качество и стиль. 
              Изделие выполнено из высококачественных материалов с использованием современных технологий производства.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">Основные преимущества:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Высокое качество материалов и сборки</li>
                <li>Стильный современный дизайн</li>
                <li>Длительный срок службы</li>
                <li>Удобство использования</li>
                <li>Официальная гарантия производителя</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="py-4">
            <div className="grid gap-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Бренд</span>
                <span className="font-medium">{product.seller}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Артикул</span>
                <span className="font-medium">#{product.id}000{product.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Страна производства</span>
                <span className="font-medium">Китай</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Гарантия</span>
                <span className="font-medium">12 месяцев</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Вес</span>
                <span className="font-medium">350 г</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-4 py-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {review.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={14}
                              className={i < review.rating ? 'text-warning fill-warning' : 'text-muted'}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
