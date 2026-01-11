import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const SellerDashboard = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const { toast } = useToast();

  const stats = [
    { label: 'Продано за месяц', value: '245', icon: 'TrendingUp', color: 'text-success', bg: 'bg-success/10' },
    { label: 'Выручка', value: '₽842,350', icon: 'DollarSign', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Активных товаров', value: '87', icon: 'Package', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Средний рейтинг', value: '4.8', icon: 'Star', color: 'text-warning', bg: 'bg-warning/10' },
  ];

  const recentOrders = [
    { id: '#MP123456', customer: 'Алексей М.', product: 'Беспроводные наушники Pro', amount: 3999, status: 'delivered', date: '15 янв 2024' },
    { id: '#MP123457', customer: 'Мария К.', product: 'Смарт-часы Ultra', amount: 11049, status: 'shipping', date: '14 янв 2024' },
    { id: '#MP123458', customer: 'Дмитрий П.', product: 'Умная колонка Mini', amount: 1499, status: 'processing', date: '14 янв 2024' },
    { id: '#MP123459', customer: 'Елена С.', product: 'Беспроводные наушники Pro', amount: 3999, status: 'delivered', date: '13 янв 2024' },
    { id: '#MP123460', customer: 'Иван Б.', product: 'Смарт-часы Ultra', amount: 11049, status: 'cancelled', date: '12 янв 2024' },
  ];

  const myProducts = [
    { id: 1, name: 'Беспроводные наушники Pro', price: 4999, stock: 45, sold: 234, rating: 4.8, status: 'active' },
    { id: 2, name: 'Смарт-часы Ultra', price: 12999, stock: 23, sold: 567, rating: 4.9, status: 'active' },
    { id: 3, name: 'Умная колонка Mini', price: 1999, stock: 0, sold: 312, rating: 4.5, status: 'out_of_stock' },
    { id: 4, name: 'Bluetooth-колонка Pro', price: 3499, stock: 67, sold: 145, rating: 4.7, status: 'active' },
    { id: 5, name: 'Наушники Sport', price: 2499, stock: 12, sold: 89, rating: 4.3, status: 'low_stock' },
  ];

  const statusConfig = {
    delivered: { label: 'Доставлен', color: 'bg-success text-white' },
    shipping: { label: 'В пути', color: 'bg-accent text-white' },
    processing: { label: 'В обработке', color: 'bg-warning text-white' },
    cancelled: { label: 'Отменён', color: 'bg-destructive text-white' },
  };

  const productStatusConfig = {
    active: { label: 'Активен', color: 'bg-success text-white' },
    out_of_stock: { label: 'Нет в наличии', color: 'bg-destructive text-white' },
    low_stock: { label: 'Мало на складе', color: 'bg-warning text-white' },
  };

  const handleAddProduct = () => {
    setIsAddProductOpen(false);
    toast({
      title: 'Товар добавлен!',
      description: 'Новый товар успешно добавлен в каталог',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-background">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => window.history.back()}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Кабинет продавца</h1>
                <p className="text-sm text-muted-foreground">TechStore</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl">
                <Icon name="Bell" size={20} className="mr-2" />
                Уведомления
                <Badge className="ml-2 bg-secondary">3</Badge>
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Icon name="Settings" size={20} className="mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                    <Icon name={stat.icon as any} className={stat.color} size={28} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="orders" className="gap-2">
              <Icon name="ShoppingBag" size={18} />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Icon name="Package" size={18} />
              Товары
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <Icon name="BarChart3" size={18} />
              Аналитика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Последние заказы</CardTitle>
                <Button variant="outline" className="rounded-xl">
                  <Icon name="Filter" size={18} className="mr-2" />
                  Фильтры
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Номер заказа</TableHead>
                      <TableHead>Покупатель</TableHead>
                      <TableHead>Товар</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell className="font-semibold">{order.amount}₽</TableCell>
                        <TableCell>
                          <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                            {statusConfig[order.status as keyof typeof statusConfig].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{order.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="rounded-lg">
                            <Icon name="Eye" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Мои товары</h2>
              <Button 
                onClick={() => setIsAddProductOpen(true)}
                className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить товар
              </Button>
            </div>

            <div className="grid gap-4">
              {myProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-muted to-background flex items-center justify-center text-3xl">
                          🎧
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <Badge className={productStatusConfig[product.status as keyof typeof productStatusConfig].color}>
                              {productStatusConfig[product.status as keyof typeof productStatusConfig].label}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="DollarSign" size={14} />
                              {product.price}₽
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Package" size={14} />
                              Склад: {product.stock}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="TrendingUp" size={14} />
                              Продано: {product.sold}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Star" size={14} className="fill-warning text-warning" />
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Icon name="Edit" size={16} className="mr-2" />
                          Редактировать
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-lg hover:bg-destructive/10 hover:text-destructive">
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-success" />
                    Продажи по месяцам
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Январь', sales: 842350, percent: 100 },
                      { month: 'Декабрь', sales: 756200, percent: 90 },
                      { month: 'Ноябрь', sales: 689400, percent: 82 },
                      { month: 'Октябрь', sales: 612300, percent: 73 },
                    ].map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{data.month}</span>
                          <span className="text-muted-foreground">{data.sales.toLocaleString()}₽</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                            style={{ width: `${data.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Package" className="text-primary" />
                    Популярные товары
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Смарт-часы Ultra', sales: 567, revenue: 7370433 },
                      { name: 'Умная колонка Mini', sales: 312, revenue: 623688 },
                      { name: 'Беспроводные наушники Pro', sales: 234, revenue: 1169766 },
                      { name: 'Рюкзак Travel Pro', sales: 145, revenue: 333355 },
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Продаж: {product.sales}</p>
                        </div>
                        <p className="font-bold text-primary">{product.revenue.toLocaleString()}₽</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" className="text-accent" />
                    География покупателей
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { city: 'Москва', orders: 89, percent: 36 },
                      { city: 'Санкт-Петербург', orders: 54, percent: 22 },
                      { city: 'Казань', orders: 32, percent: 13 },
                      { city: 'Новосибирск', orders: 28, percent: 11 },
                      { city: 'Другие города', orders: 42, percent: 18 },
                    ].map((location, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{location.city}</span>
                            <span className="text-sm text-muted-foreground">{location.orders} заказов</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent rounded-full"
                              style={{ width: `${location.percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MessageCircle" className="text-warning" />
                    Последние отзывы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { author: 'Алексей М.', rating: 5, text: 'Отличный товар! Рекомендую', date: '2 часа назад' },
                      { author: 'Мария К.', rating: 4, text: 'Хорошее качество за свою цену', date: '5 часов назад' },
                      { author: 'Дмитрий П.', rating: 5, text: 'Превзошло ожидания!', date: 'вчера' },
                    ].map((review, index) => (
                      <div key={index} className="p-3 bg-muted/50 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{review.author}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                size={12}
                                className={i < review.rating ? 'text-warning fill-warning' : 'text-muted'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{review.text}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавить новый товар</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">Название товара *</Label>
              <Input id="product-name" placeholder="Например: Беспроводные наушники" className="rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Цена *</Label>
                <Input id="price" type="number" placeholder="0" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Количество на складе *</Label>
                <Input id="stock" type="number" placeholder="0" className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория *</Label>
              <Select>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Электроника</SelectItem>
                  <SelectItem value="clothing">Одежда</SelectItem>
                  <SelectItem value="home">Дом и сад</SelectItem>
                  <SelectItem value="beauty">Красота</SelectItem>
                  <SelectItem value="sport">Спорт</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Textarea id="description" placeholder="Опишите ваш товар..." className="rounded-xl min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label>Изображения</Label>
              <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Нажмите или перетащите изображения</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)} className="rounded-xl">
              Отмена
            </Button>
            <Button onClick={handleAddProduct} className="rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить товар
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerDashboard;
